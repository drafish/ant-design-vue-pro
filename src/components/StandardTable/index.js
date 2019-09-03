import { Table, Alert } from "ant-design-vue";
import styles from "./index.less";

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

const StandardTable = {
  props: [
    "columns",
    "data",
    "rowKey",
    "selectedRows",
    "loading",
    "selectRow",
    "change"
  ],
  data() {
    const { columns } = this.$props;
    const needTotalList = initTotalList(columns);

    return {
      selectedRowKeys: [],
      needTotalList
    };
  },

  beforeUpdate() {
    // clean state
    if (this.selectedRows.length === 0) {
      this.needTotalList = initTotalList(this.$props.columns);
    }
  },

  methods: {
    handleRowSelectChange(selectedRowKeys, selectedRows) {
      let { needTotalList } = this.$data;
      needTotalList = needTotalList.map(item => ({
        ...item,
        total: selectedRows.reduce(
          (sum, val) => sum + parseFloat(val[item.dataIndex], 10),
          0
        )
      }));
      const { selectRow } = this.$props;
      if (selectRow) {
        selectRow(selectedRows);
      }

      Object.assign(this, { selectedRowKeys, needTotalList });
    },

    handleTableChange(pagination, filters, sorter) {
      const { change } = this.$props;
      if (change) {
        change(pagination, filters, sorter);
      }
    },

    cleanSelectedKeys() {
      this.handleRowSelectChange([], []);
    }
  },

  render() {
    const { selectedRowKeys, needTotalList } = this.$data;
    const { data = {}, rowKey, ...rest } = this.$props;
    const { list = [], pagination } = data;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        props: {
          disabled: record.disabled
        }
      })
    };

    return (
      <div class={styles.standardTable}>
        <div class={styles.tableAlert}>
          <Alert
            message={
              <div>
                已选择{" "}
                <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>{" "}
                项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span style={{ marginLeft: "8px" }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <a
                  onClick={this.cleanSelectedKeys}
                  style={{ marginLeft: "24px" }}
                >
                  清空
                </a>
              </div>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          rowKey={rowKey || "key"}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...{ props: rest }}
        />
      </div>
    );
  }
};

export default StandardTable;

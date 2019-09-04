import debounce from "lodash/debounce";
import bind from "lodash/bind";
import {
  Icon,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
} from "ant-design-vue";
import classNames from "classnames";
import DescriptionList from "@/components/DescriptionList";
import styles from "./AdvancedProfile.less";
import { mapState, mapActions } from "vuex";
import PropTypes from "ant-design-vue/es/_util/vue-types";

Badge.props.text = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);

const { Step } = Steps;
const { Description } = DescriptionList;

const getWindowWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

const AdvancedProfile = {
  data() {
    return {
      operationkey: "tab1",
      stepDirection: "horizontal",
    };
  },

  computed: {
    ...mapState("profile", {
      profile: state => state,
      loading: state => state.loadingAdvanced,
    }),
  },

  created() {
    this.setStepDirection = debounce(
      bind(function() {
        const { stepDirection } = this.$data;
        const w = getWindowWidth();
        if (stepDirection !== "vertical" && w <= 576) {
          Object.assign(this, {
            stepDirection: "vertical",
          });
        } else if (stepDirection !== "horizontal" && w > 576) {
          Object.assign(this, {
            stepDirection: "horizontal",
          });
        }
      }, this),
      200,
    );
  },

  mounted() {
    this.fetchAdvanced();

    this.setStepDirection();
    window.addEventListener("resize", this.setStepDirection, { passive: true });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.setStepDirection);
    this.setStepDirection.cancel();
  },

  methods: {
    ...mapActions("profile", ["fetchAdvanced"]),
    onOperationTabChange(key) {
      Object.assign(this, { operationkey: key });
    },
  },

  render() {
    const desc1 = (
      <div class={classNames(styles.textSecondary, styles.stepDescription)}>
        曲丽丽
        <Icon type="dingding-o" style={{ marginLeft: "8px" }} />
        <div>2016-12-12 12:32</div>
      </div>
    );

    const desc2 = (
      <div class={styles.stepDescription}>
        周毛毛
        <Icon
          type="dingding-o"
          style={{ color: "#00A0E9", marginLeft: "8px" }}
        />
        <div>
          <a href="">催一下</a>
        </div>
      </div>
    );

    const popoverContent = (
      <div style={{ width: "160px" }}>
        吴加号
        <span class={styles.textSecondary} style={{ float: "right" }}>
          <Badge
            status="default"
            text={<span style={{ color: "rgba(0, 0, 0, 0.45)" }}>未响应</span>}
          />
        </span>
        <div class={styles.textSecondary} style={{ marginTop: "4px" }}>
          耗时：2小时25分钟
        </div>
      </div>
    );

    const customDot = ({ status, prefixCls }) =>
      status === "process" ? (
        <Popover
          placement="topLeft"
          arrowPointAtCenter
          content={popoverContent}
        >
          <span class={`${prefixCls}-icon-dot`}></span>
        </Popover>
      ) : (
        <span class={`${prefixCls}-icon-dot`}></span>
      );

    const operationTabList = [
      {
        key: "tab1",
        tab: "操作日志一",
      },
      {
        key: "tab2",
        tab: "操作日志二",
      },
      {
        key: "tab3",
        tab: "操作日志三",
      },
    ];

    const columns = [
      {
        title: "操作类型",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "操作人",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "执行结果",
        dataIndex: "status",
        key: "status",
        customRender: text =>
          text === "agree" ? (
            <Badge status="success" text="成功" />
          ) : (
            <Badge status="error" text="驳回" />
          ),
      },
      {
        title: "操作时间",
        dataIndex: "updatedAt",
        key: "updatedAt",
      },
      {
        title: "备注",
        dataIndex: "memo",
        key: "memo",
      },
    ];

    const { stepDirection, operationkey } = this.$data;
    const { profile, loading } = this;
    const {
      advancedOperation1,
      advancedOperation2,
      advancedOperation3,
    } = profile;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };

    return (
      <div>
        <Card
          title="流程进度"
          style={{ marginBottom: "24px" }}
          bordered={false}
        >
          <Steps
            direction={stepDirection}
            current={1}
            {...{
              scopedSlots: {
                progressDot: customDot,
              },
            }}
          >
            <Step title="创建项目" description={desc1} />
            <Step title="部门初审" description={desc2} />
            <Step title="财务复核" />
            <Step title="完成" />
          </Steps>
        </Card>
        <Card
          title="用户信息"
          style={{ marginBottom: "24px" }}
          bordered={false}
        >
          <DescriptionList style={{ marginBottom: "24px" }}>
            <Description term="用户姓名">付小小</Description>
            <Description term="会员卡号">32943898021309809423</Description>
            <Description term="身份证">3321944288191034921</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="联系地址">
              曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
            </Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: "24px" }} title="信息组">
            <Description term="某某数据">725</Description>
            <Description term="该数据更新时间">2017-08-08</Description>
            <Description>&nbsp;</Description>
            <Description
              term={
                <span>
                  某某数据
                  <Tooltip title="数据说明">
                    <Icon
                      style={{
                        color: "rgba(0, 0, 0, 0.43)",
                        marginLeft: "4px",
                      }}
                      type="info-circle-o"
                    />
                  </Tooltip>
                </span>
              }
            >
              725
            </Description>
            <Description term="该数据更新时间">2017-08-08</Description>
          </DescriptionList>
          <h4 style={{ marginBottom: "16px" }}>信息组</h4>
          <Card type="inner" title="多层级信息组">
            <DescriptionList
              size="small"
              style={{ marginBottom: "16px" }}
              title="组名称"
            >
              <Description term="负责人">林东东</Description>
              <Description term="角色码">1234567</Description>
              <Description term="所属部门">XX公司 - YY部</Description>
              <Description term="过期时间">2017-08-08</Description>
              <Description term="描述">
                这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
              </Description>
            </DescriptionList>
            <Divider style={{ margin: "16px 0" }} />
            <DescriptionList
              size="small"
              style={{ marginBottom: "16px" }}
              title="组名称"
              col="1"
            >
              <Description term="学名">
                Citrullus lanatus (Thunb.) Matsum. et
                Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
              </Description>
            </DescriptionList>
            <Divider style={{ margin: "16px 0" }} />
            <DescriptionList size="small" title="组名称">
              <Description term="负责人">付小小</Description>
              <Description term="角色码">1234568</Description>
            </DescriptionList>
          </Card>
        </Card>
        <Card
          title="用户近半年来电记录"
          style={{ marginBottom: "24px" }}
          bordered={false}
        >
          <div class={styles.noData}>
            <Icon type="frown-o" />
            暂无数据
          </div>
        </Card>
        <Card
          class={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[operationkey]}
        </Card>
      </div>
    );
  },
};

export default AdvancedProfile;

import { formatMessage } from "@/locales";
import Exception from "@/components/Exception";

const Exception403 = {
  name: "Exception403",
  functional: true,
  render() {
    return (
      <Exception
        type="403"
        desc={formatMessage({ id: "app.exception.description.403" })}
        linkElement="router-link"
        backText={formatMessage({ id: "app.exception.back" })}
      />
    );
  },
};

export default Exception403;

import { formatMessage } from "@/locales";
import Exception from "@/components/Exception";

const Exception404 = {
  name: "Exception404",
  functional: true,
  render() {
    return (
      <Exception
        type="404"
        desc={formatMessage({ id: "app.exception.description.404" })}
        linkElement="router-link"
        backText={formatMessage({ id: "app.exception.back" })}
      />
    );
  },
};

export default Exception404;

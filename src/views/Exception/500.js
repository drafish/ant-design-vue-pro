import { formatMessage } from "@/locales";
import Exception from "@/components/Exception";

const Exception500 = {
  name: "Exception500",
  functional: true,
  render() {
    return (
      <Exception
        type="500"
        desc={formatMessage({ id: "app.exception.description.500" })}
        linkElement="router-link"
        backText={formatMessage({ id: "app.exception.back" })}
      />
    );
  }
};

export default Exception500;

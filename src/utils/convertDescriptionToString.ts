import { TodoDescription } from "@/requests/todos/types/Todo";

const convertDescriptionToString = (
  description: TodoDescription
): string => {
  const convertedResult = description.map((item) => {
    return item.children[0].text;
  }).join("\n");

  return convertedResult;
};

export default convertDescriptionToString;

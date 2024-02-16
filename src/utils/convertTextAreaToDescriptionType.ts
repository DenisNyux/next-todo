import { TodoDescription } from "@/requests/todos/types/Todo";

const convertTextAreaToDescriptionType = (
  description: string
): TodoDescription => {
  const splittedDescription = description.split("\n");

  const convertedResult = splittedDescription.map((item) => {
    return {
      type: "paragraph",
      children: [
        {
          type: "text",
          text: item,
        },
      ],
    };
  });

  return convertedResult;
};

export default convertTextAreaToDescriptionType;

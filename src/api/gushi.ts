import axios from "axios";
import { useQuery } from "react-query";

export function useGuShi() {
  return useQuery(["GuShi"], async () => {
    try {
      const res = await axios.get<{ content: string }>(
        "https://v1.jinrishici.com/all.json"
      );
      return res.data.content;
    } catch (error) {
      return "庭院深深深几许，杨柳堆烟，帘幕无重数。";
    }
  });
}

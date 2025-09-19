import { Status } from "../types/status";
import { IVisitRate } from "../types/visitRate";

class MISRepository {
  constructor(private misApiUrl: string) {}

  sendProtocol = async (visitId: number, protocol: string): Promise<boolean> => {
    try {
      const res = await fetch(this.misApiUrl + `/visit/${visitId}/protocol`, {
        method: "POST",
        body: JSON.stringify({ protocol }),
      });

      const json = await res.json();

      return json.status === Status.Success;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  sendRate = async (visitId: number, visitRate: IVisitRate): Promise<boolean> => {
    try {
      const res = await fetch(this.misApiUrl + `/visit/${visitId}/rate`, {
        method: "POST",
        body: JSON.stringify(visitRate),
      });

      const json = await res.json();

      return json.status === Status.Success;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}

export { MISRepository };

import { Status } from "../types/status";
import { IVisit } from "../types/visit";

class DataBusRepository {
  constructor(private dataBusApiUrl: string) {}

  sendVisit = async (visit: IVisit): Promise<any> => {
    const res = await fetch(this.dataBusApiUrl + "/visit", {
      method: "POST",
      body: JSON.stringify(visit),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    return json;
  };

  sendVisitCancel = async (visit: IVisit): Promise<any> => {
    const res = await fetch(this.dataBusApiUrl + "/visit/cancel", {
      method: "POST",
      body: JSON.stringify(visit),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    return json;
  };
}

export { DataBusRepository };

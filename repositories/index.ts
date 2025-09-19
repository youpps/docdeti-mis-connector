import { DataBusRepository } from "./dataBusRepository";
import { MISRepository } from "./MISRepository";

class Repositories {
  readonly dataBusRepository: DataBusRepository;
  readonly misRepository: MISRepository;

  constructor(dataBusApiUrl: string, misApiUrl: string) {
    this.dataBusRepository = new DataBusRepository(dataBusApiUrl);
    this.misRepository = new MISRepository(misApiUrl);
  }
}

export { Repositories };

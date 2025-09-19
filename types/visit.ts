enum VisitType {
  Nurse = "nurse",
  Doctor = "doctor",
}

enum VisitFeedbackType {
  Positive = "positive",
  Negative = "negative",
  Nopurpose = "nopurpose",
  Warning = "warning",
  Commercial = "commercial",
}

interface IVisit {
  id: string;
  parent: string | null;
  child: string | null;
  type: VisitType;
  recordUrl: string;
  processedAt: Date;
  date: Date;
  phone: string;
  comment: string;
  doctor: string;
  address: string;
  specialization: string;
  serviceName: string;
  isLast: 1 | 0;
}

type ICancelledVisit = IVisit & {
  recordUrl: string | null;
  processedAt: string | null;
};

export { IVisit, ICancelledVisit, VisitFeedbackType, VisitType };

import { Request, Response } from "express";
import Joi from "joi";
import { Repositories } from "../repositories";
import { Status } from "../types/status";
import { IVisit,  VisitType } from "../types/visit";

class VisitsController {
  constructor(private repositories: Repositories) {}

  visitWebhook = async (req: Request, res: Response) => {
    try {
      const visitSchema = Joi.object({
        id: Joi.number().min(1).required(),
        parent: Joi.string().min(1).required(),
        child: Joi.string().min(1).required(),
        type: Joi.valid(VisitType.Doctor, VisitType.Nurse).required(),
        recordUrl: Joi.string().min(1).required(),
        processedAt: Joi.date().required(),
        date: Joi.date().required(),
        phone: Joi.string().min(1).required(),
        comment: Joi.string().min(1).required(),
        doctor: Joi.string().min(1).required(),
        address: Joi.string().min(1).required(),
        isLast: Joi.valid(1, 0).required(),
      });

      const { error: validationError, value: visitData } = visitSchema.validate(req.body);
      if (validationError) {
        return res.status(400).json({
          status: Status.Error,
          data: { message: validationError.message },
        });
      }

      const isSent = await this.repositories.dataBusRepository.sendVisit(visitData as IVisit);
      if (!isSent) {
        return res.status(500).json({
          status: Status.Error,
          data: { message: "Visit has not been sent to data bus due to internal error" },
        });
      }

      return res.status(200).json({
        status: Status.Success,
        data: { message: "Visit has been successfully handled" },
      });
    } catch (error) {
      console.error("Visit webhook error:", error);

      return res.status(500).json({
        status: Status.Error,
        data: { message: "Internal server error" },
      });
    }
  };

  visitCancel = async (req: Request, res: Response) => {
    try {
      const visitSchema = Joi.object({
        id: Joi.string().min(1).required(),
        parent: Joi.string().allow(null).min(1).required(),
        child: Joi.string().allow(null).min(1).required(),
        type: Joi.valid(VisitType.Doctor, VisitType.Nurse).required(),
        recordUrl: Joi.string().allow(null).min(1).required(),
        processedAt: Joi.date().allow(null).required(),
        date: Joi.date().required(),
        phone: Joi.string().min(1).required(),
        comment: Joi.string().min(1).required(),
        doctor: Joi.string().min(1).required(),
        address: Joi.string().min(1).required(),
        specialization: Joi.string().min(1).required(),
        serviceName: Joi.string().min(1).required(),
        isLast: Joi.valid(1, 0).required(),
      });

      const { error: validationError, value: visitData } = visitSchema.validate(req.body);
      if (validationError) {
        return res.status(400).json({
          status: Status.Error,
          data: { message: validationError.message },
        });
      }

      const isSent = await this.repositories.dataBusRepository.sendVisitCancel(visitData as IVisit);
      if (!isSent) {
        return res.status(500).json({
          status: Status.Error,
          data: { message: "Visit cancel has not been sent to data bus due to internal error" },
        });
      }

      return res.status(200).json({
        status: Status.Success,
        data: { message: "Visit cancel has been successfully handled" },
      });
    } catch (error) {
      console.log("Visit webhook error:", error);

      return res.status(500).json({
        status: Status.Error,
        data: { message: "Internal server error" },
      });
    }
  };

  handleProtocol = async (req: Request, res: Response) => {
    try {
      const paramsSchema = Joi.object({ visitId: Joi.number().min(1).required() });
      const bodySchema = Joi.object({ protocol: Joi.string().min(1).required() });

      const { error: paramsError, value: params } = paramsSchema.validate(req.params);
      const { error: bodyError, value: body } = bodySchema.validate(req.body);

      if (paramsError || bodyError) {
        return res.status(400).json({
          status: Status.Error,
          data: { message: (paramsError || bodyError)?.message },
        });
      }

      const isSent = await this.repositories.misRepository.sendProtocol(params.visitId, body.protocol);
      if (!isSent) {
        return res.status(500).json({
          status: Status.Error,
          data: { message: "Protocol has not been sent to data bus due to internal error" },
        });
      }

      return res.status(200).json({
        status: Status.Success,
        data: { message: "Protocol has been successfully saved" },
      });
    } catch (error) {
      console.error("Handle protocol error:", error);

      return res.status(500).json({
        status: Status.Error,
        data: { message: "Internal server error" },
      });
    }
  };

  handleRate = async (req: Request, res: Response) => {
    try {
      const paramsSchema = Joi.object({ visitId: Joi.number().min(1).required() });

      const bodySchema = Joi.object({
        didDoctorIntroduceThemselves: Joi.valid(1, 0).required(),
        didDoctorGreetPatient: Joi.valid(1, 0).required(),
        didDoctorUseOpenQuestion: Joi.valid(1, 0).required(),
        didDoctorCommentOnObservations: Joi.valid(1, 0).required(),
        didDoctorExplainResultInterpreterAndSpecialty: Joi.valid(1, 0).required(),
        didDoctorExplainWhereToFindReport: Joi.valid(1, 0).required(),
        wasDoctorEmpathetic: Joi.valid(1, 0).required(),
        patientNegativeExperienceSummary: Joi.string().min(1).required(),
        referralToAnotherClinicSummary: Joi.string().min(1).required(),
      });

      const { error: paramsError, value: params } = paramsSchema.validate(req.params);
      const { error: bodyError, value: body } = bodySchema.validate(req.body);

      if (paramsError || bodyError) {
        return res.status(400).json({
          status: Status.Error,
          data: { message: (paramsError || bodyError)?.message },
        });
      }

      const isSent = await this.repositories.misRepository.sendRate(params.visitId, body);
      if (!isSent) {
        return res.status(500).json({
          status: Status.Error,
          data: { message: "Rate has not been sent to data bus due to internal error" },
        });
      }

      return res.status(200).json({
        status: Status.Success,
        data: { message: "Rate has been successfully saved" },
      });
    } catch (error) {
      console.error("Handle rate error:", error);

      return res.status(500).json({
        status: Status.Error,
        data: { message: "Internal server error" },
      });
    }
  };
}

export { VisitsController };

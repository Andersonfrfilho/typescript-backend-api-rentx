import { Response, Request } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "@modules/cars/useCases/uploadCarImages/upoloadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const images = request.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const images_names = images.map((file) => file.filename);

    const all = await uploadCarImageUseCase.execute({
      car_id: id,
      images_names,
    });

    return response.json(all);
  }
}
export { ListCategoriesController };

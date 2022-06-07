import { IsString } from 'class-validator';
 
export class CreateHelloRequest {
  @IsString()
  public message: string;
}

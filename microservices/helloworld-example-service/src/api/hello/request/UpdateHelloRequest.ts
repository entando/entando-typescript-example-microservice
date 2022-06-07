import { IsString } from 'class-validator';
 
export class UpdateHelloRequest {
  @IsString()
  public message: string;
}

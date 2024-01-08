import { ApiProperty } from "@nestjs/swagger";

export class UserParam {
    @ApiProperty({
        description: 'The id of the user',
        example: "1",
        type: Number,
    })
    public id: number;
}
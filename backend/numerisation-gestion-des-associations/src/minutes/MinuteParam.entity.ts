import { ApiProperty } from "@nestjs/swagger";

export class MinuteParam {
    @ApiProperty({
        description: 'The id of the minute',
        example: "1",
        type: Number,
    })
    public id: number;
}
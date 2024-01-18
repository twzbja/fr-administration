import { ApiProperty } from "@nestjs/swagger";

export class AssociationParam {
    @ApiProperty({
        description: 'The id of the association',
        example: "1",
        type: Number,
    })
    public id: number;
}
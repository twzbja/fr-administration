import { ApiProperty } from "@nestjs/swagger";
import { Association } from "./associations.entity";

export class AssociationInput {

    @ApiProperty({
        description: 'The name of the association',
        example: "Association Name",
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'An array of user IDs associated with the association',
        example: [1, 2, 3],
        type: () => Association,
    })
    public users: Association[];
}

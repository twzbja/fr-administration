import { ApiProperty } from "@nestjs/swagger";

export class AssociationInput {
    @ApiProperty({
        description: 'The name of the assocaition',
        example: "Mouvement du Manga MVC",
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'Id of users in association',
        example: "[1,2,3]",
        type: Number,
    })
    public idUsers: number[];

}
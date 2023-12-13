import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity()
export class PhotoEntity {
    @PrimaryGeneratedColumn('increment')
    id:number;
    
    @Column('varchar', {
        name: 'url',
        nullable: false,
        comment: 'url photo'
    })
    url: string

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.urlPhoto)

    Usuario: UsuarioEntity

}
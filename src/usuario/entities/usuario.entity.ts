import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PhotoEntity } from "./photo.entity";

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn('increment')
    id:number;
    
    @Column('varchar', {
        name: 'username',
        nullable: false,
        comment: 'name user'
    })
    name: string

    @Column('numeric', {
        name: 'age',
        nullable: false,
        comment: 'user age'
    })
    age: number


    @OneToMany(() => PhotoEntity, photo => photo.Usuario,
    {
        cascade: true
    }
    )
    urlPhoto?: PhotoEntity[]

}

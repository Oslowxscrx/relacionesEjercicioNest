import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginacionDto } from 'src/common/dto/paginacion.dto';
import { PhotoEntity } from './entities/photo.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(PhotoEntity)
    private photoRepository: Repository<PhotoEntity>,
  ) {}

  async create(createusuarioDto: CreateUsuarioDto) {
    try{
      const {urlPhoto=[], ...usuarioDetalles}= createusuarioDto
    const empleado = this.usuarioRepository.create(
      
      {
        ...usuarioDetalles,
        urlPhoto: urlPhoto.map(urlPhoto => this.photoRepository.create({url: urlPhoto}))
      }

    );
    return await this.usuarioRepository.save(empleado);
    } catch (error){
      console.log(error)
      throw new Error("No se puedo realizar el ingreso a base")
    }
}

  findAll(paginacionDto: PaginacionDto) {
    const { limit= 10, offset=1 } = paginacionDto
    return this.usuarioRepository.find({
      take: limit,
      skip: offset,
      relations: {
        urlPhoto: true
      }
    }); // Devuelve todos los usuarios
  }

  async findOne(id:number) {
    const usuarios = await this.usuarioRepository.findOneBy({ id });

    if(!usuarios)
    throw new NotAcceptableException(id)
    return usuarios;
  }

  async update(id: number, updateusuarioDto: UpdateUsuarioDto) {
    const usuarios = await this.usuarioRepository.preload({
      id: id,
      ...updateusuarioDto,
      urlPhoto: []
    })
    if(!usuarios)
    throw new NotAcceptableException('no se puedo actualizar');
  await this.usuarioRepository.save(usuarios);
  return usuarios


    
  }

  async delete(id: number) {
    const usuarios = await this.findOne(id);
    this.usuarioRepository.delete(usuarios)
  }
}

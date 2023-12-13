import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioEntity } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './entities/photo.entity';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports:[ TypeOrmModule.forFeature([UsuarioEntity, PhotoEntity])]
})
export class UsuarioModule {}

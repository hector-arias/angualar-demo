import { Categoria } from './categoria.model';

export interface Product {

    idproducto: number,
    categoria: Categoria,
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    sku: string,
    imageUrl: string
}

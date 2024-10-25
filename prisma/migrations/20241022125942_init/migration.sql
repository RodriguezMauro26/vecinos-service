-- CreateTable
CREATE TABLE "ciudadanos" (
    "ciudadano_id" SERIAL NOT NULL,
    "cuil" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "es_vecino" BOOLEAN NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL,
    "actualizado_en" TIMESTAMP(3),

    CONSTRAINT "ciudadanos_pkey" PRIMARY KEY ("ciudadano_id")
);

-- CreateTable
CREATE TABLE "direcciones_ciudadanos" (
    "direccion_ciudadano_id" SERIAL NOT NULL,
    "calle" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "orientacion" TEXT NOT NULL,
    "zona" INTEGER NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL,
    "actualizado_en" TIMESTAMP(3),

    CONSTRAINT "direcciones_ciudadanos_pkey" PRIMARY KEY ("direccion_ciudadano_id")
);

-- CreateTable
CREATE TABLE "rel_ciudadanos_direcciones" (
    "rel_ciudadano_direccion_id" SERIAL NOT NULL,
    "ciudadano_id" INTEGER NOT NULL,
    "direccion_ciudadano_id" INTEGER NOT NULL,

    CONSTRAINT "rel_ciudadanos_direcciones_pkey" PRIMARY KEY ("rel_ciudadano_direccion_id")
);

-- AddForeignKey
ALTER TABLE "rel_ciudadanos_direcciones" ADD CONSTRAINT "rel_ciudadanos_direcciones_ciudadano_id_fkey" FOREIGN KEY ("ciudadano_id") REFERENCES "ciudadanos"("ciudadano_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rel_ciudadanos_direcciones" ADD CONSTRAINT "rel_ciudadanos_direcciones_direccion_ciudadano_id_fkey" FOREIGN KEY ("direccion_ciudadano_id") REFERENCES "direcciones_ciudadanos"("direccion_ciudadano_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "rel_ciudadanos_direcciones" DROP CONSTRAINT "rel_ciudadanos_direcciones_ciudadano_id_fkey";

-- DropForeignKey
ALTER TABLE "rel_ciudadanos_direcciones" DROP CONSTRAINT "rel_ciudadanos_direcciones_direccion_ciudadano_id_fkey";

-- AddForeignKey
ALTER TABLE "rel_ciudadanos_direcciones" ADD CONSTRAINT "rel_ciudadanos_direcciones_ciudadano_id_fkey" FOREIGN KEY ("ciudadano_id") REFERENCES "ciudadanos"("ciudadano_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rel_ciudadanos_direcciones" ADD CONSTRAINT "rel_ciudadanos_direcciones_direccion_ciudadano_id_fkey" FOREIGN KEY ("direccion_ciudadano_id") REFERENCES "direcciones_ciudadanos"("direccion_ciudadano_id") ON DELETE CASCADE ON UPDATE CASCADE;

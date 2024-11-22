import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.rel_ciudadanos_direcciones.deleteMany()
        await prisma.direcciones_ciudadanos.deleteMany()
        await prisma.ciudadanos.deleteMany()

        //#region Agregar datos a la tabla Ciudadanos
        const ciudadanoData: Prisma.ciudadanosCreateInput[] = []
        for (let i = 0; i < 15; i++) {
            ciudadanoData.push({
                cuil: faker.string.numeric(11),
                nombre: faker.person.firstName(),
                apellido: faker.person.lastName(),
                email: faker.internet.email(),
                telefono: faker.phone.number({ style: 'international' }),
                es_vecino: faker.datatype.boolean()
            })
        }
        const createdCiudadanos = await prisma.ciudadanos.createMany({
            data: ciudadanoData,
            skipDuplicates: true
        });
        console.log(`Creadas ${createdCiudadanos.count} Ciudadanos.`);
        //#endregion

        //#region Agregar datos a la tabla Direcciones_Ciudadanos
        const direccionesData: Prisma.direcciones_ciudadanosCreateInput[] = []
        for (let i = 0; i < 15; i++) {
            direccionesData.push({
                calle: faker.location.street(),
                numero: faker.number.int({ min: 2, max: 560 }),
                orientacion: faker.location.cardinalDirection(),
                zona: faker.number.int({ min: 32, max: 64 }),
                latitud: faker.location.latitude(),
                longitud: faker.location.longitude()
            })
        }
        const createdDirecciones = await prisma.direcciones_ciudadanos.createMany({
            data: direccionesData,
            skipDuplicates: true
        })
        console.log(`Created ${createdDirecciones.count} Direcciones.`);
        //#endregion

        //#region Agregar datos a la tabla Relacion_Ciudadano_Direccion
        const allCiudadanos = await prisma.ciudadanos.findMany()
        const allDirecciones = await prisma.direcciones_ciudadanos.findMany()
        const relacionData: Prisma.rel_ciudadanos_direccionesCreateManyInput[] = []
        for (let i = 0; i < 30; i++) {
            const randomCiudadano = faker.helpers.arrayElement(allCiudadanos)
            const randomDireccion = faker.helpers.arrayElement(allDirecciones)
            relacionData.push({
                ciudadano_id: randomCiudadano.ciudadano_id,
                direccion_ciudadano_id: randomDireccion.direccion_ciudadano_id
            })
        }
        const createdRelacion = await prisma.rel_ciudadanos_direcciones.createMany({
            data: relacionData,
            skipDuplicates: true
        })
        console.log(`Created ${createdRelacion.count} Relaciones.`);
        //#endregion
    }
    catch (error) {
        console.log(error)
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    prisma.$disconnect
})
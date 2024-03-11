-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cultura" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "kc" DOUBLE PRECISION NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Cultura_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cultura" ADD CONSTRAINT "Cultura_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

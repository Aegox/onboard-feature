
"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface DocumentType {
    value: string;
    label: string;
}

const documentTypes: DocumentType[] = [
    { value: "CC", label: "Cédula de Ciudadanía" },
    { value: "NT", label: "NIT" }
];

const cities: string[] = [
    "Bogotá",
];

const formSchema = z.object({
    email: z.string().email("El correo electrónico debe ser válido"),
    documentType: z.string().nonempty("Seleccione un tipo de documento"),
    documentNumber: z.string().min(6, "El número de documento debe tener al menos 6 caracteres"),
    city: z.string().nonempty("Seleccione una ciudad"),
    phoneNumber: z.string().min(10, "El número debe tener al menos 10 dígitos"),
});

type FormData = z.infer<typeof formSchema>;

interface FormularioProps {
    companyName: string; 
}

export default function Formulario({ companyName }: FormularioProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
    });

    const onSubmit = (data: FormData) => {
        const allData = {...data, companyName};
        console.log("Datos enviados:", allData);
        alert("¡Formulario enviado con éxito!");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-transparent p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Formulario de Información</CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="mb-4">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="tuemail@ejemplo.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="documentType">Tipo de Documento</Label>
                            <select
                                id="documentType"
                                {...register("documentType")}
                                className="w-full border rounded p-2 bg-background text-foreground "
                            >
                                <option value="">Seleccione un tipo de documento</option>
                                {documentTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            {errors.documentType && (
                                <p className="text-red-500 text-sm mt-1">{errors.documentType.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="documentNumber">Número de Documento</Label>
                            <Input
                                type="text"
                                id="documentNumber"
                                placeholder="Número de documento"
                                {...register("documentNumber")}
                            />
                            {errors.documentNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.documentNumber.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="city">Ciudad</Label>
                            <select id="city" {...register("city")} className="w-full border bg-background text-foreground rounded p-2">
                                <option value="">Seleccione una ciudad</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="phoneNumber">Número de Teléfono</Label>
                            <Input
                                type="tel"
                                id="phoneNumber"
                                placeholder="+57 123 456 7890"
                                {...register("phoneNumber")}
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-center">
                        <Button
                            type="submit"
                            variant="primary"
                            className="bg-chart-1 hover:brightness-90 text-white font-semibold rounded-lg h-[35px] w-[160px] min-w-[160px] min-h-[35px] transition-all duration-500 ease-in-out text-[1rem]"
                        >
                            Enviar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}


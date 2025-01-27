import { useState } from "react";

interface InputSectionProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  inputVisible: boolean;
  buttonClicked: boolean;
  handleSendClick: () => void;
}

export default function InputSection({
  companyName,
  setCompanyName,
  inputVisible,
  buttonClicked,
  handleSendClick,
}: InputSectionProps) {
  const [error, setError] = useState<string>("");

  const handleSend = () => {
    if (!companyName.trim()) {
      setError("El nombre de la empresa es obligatorio"); // Mostrar error si el campo está vacío
      return;
    }
    setError(""); // Limpiar el error si el campo es válido
    handleSendClick(); // Llamar a la función del padre
  };

  return (
    <section
      className={`flex justify-between min-h-[75px] h-[75px] border-2 border-border rounded-2xl pl-[10px] mb-[20px] transition-all duration-300 ${
        inputVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col transition-all duration-300">
          <label className="text-slate-600 text-[0.8rem]">Muchas gracias, somos...</label>
          {buttonClicked ? (
            <span className="bg-transparent w-full text-foreground border-0">
              {companyName || "Nombre de tu empresa"}
            </span>
          ) : (
            <input
              className="bg-transparent w-full text-foreground border-0 focus:outline-none"
              placeholder="Nombre de tu empresa"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          )}
          {/* Mostrar el error si existe */}
          {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
        {!buttonClicked && (
          <button
            onClick={handleSend}
            className={`text-white font-semibold text-[0.9rem] rounded-lg w-[80px] h-[35px] m-[10px] bg-chart-1 hover:brightness-90 transition-all duration-300 ${
              buttonClicked ? "opacity-0" : "opacity-100"
            }`}
          >
            Enviar
          </button>
        )}
      </div>
    </section>
  );
}

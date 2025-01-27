"use client";

import { useEffect, useState } from "react";
import VisibleText from "@/components/VisibleText";
import InputSection from "@/components/InputSection";
import AdditionalSection from "@/components/AdditionalSection";
import Formulario from "@/components/form";

// Textos que se mostrarán en la interfaz
const texts = {
  text1: "Hola, somos [name].",
  text2: "Nos especializamos en un sistema de",
  text3: "referidos que ayuda a tu empresa.",
  text4: "Bienvenido, mucho gusto tenerte acá.",
  text5: "Muchas gracias, somos...",
  text6: "Un placer ",
  text7: "Un último paso antes de finalizar.",
};

export default function Onboard() {
  // Estados para controlar la visibilidad y animaciones
  const [visibleTexts, setVisibleTexts] = useState<boolean[]>([false, false, false, false, false]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [showAdditionalSection, setShowAdditionalSection] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formAnimation, setFormAnimation] = useState<boolean>(false);
  const [showPrimarySection, setShowPrimarySection] = useState<boolean>(true);
  const [primarySectionAnimation, setPrimarySectionAnimation] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [continueButtonAnimation, setContinueButtonAnimation] = useState<boolean>(false);

  // Efecto para mostrar los textos con un retraso
  useEffect(() => {
    const showText = (index: number) => {
      if (index < 4) {
        setVisibleTexts((prev) => {
          const newVisibleTexts = [...prev];
          newVisibleTexts[index] = true; // Mostrar el texto actual
          return newVisibleTexts;
        });
        setTimeout(() => showText(index + 1), 400); // Siguiente texto con retraso
      } else {
        setTimeout(() => setInputVisible(true), 400); // Mostrar el input después del último texto
      }
    };

    showText(0); // Iniciar la secuencia de textos
  }, []);

  // Lógica para manejar el clic en "Enviar"
  const handleSendClick = () => {
    setButtonClicked(true); // Deshabilitar el botón y mostrar la sección adicional
    setShowAdditionalSection(true);

    setTimeout(() => {
      let delay = 400;
      [4, 5].forEach((textIndex) => {
        setTimeout(() => {
          setVisibleTexts((prev) => {
            const newVisibleTexts = [...prev];
            newVisibleTexts[textIndex] = true; // Mostrar textos adicionales
            return newVisibleTexts;
          });
        }, delay);
        delay += 400; // Retraso entre textos
      });

      setTimeout(() => {
        setButtonVisible(true); // Mostrar el botón de continuar
        setTimeout(() => setContinueButtonAnimation(true), 100); // Animación del botón
      }, delay);
    }, 500);
  };

  // Lógica para manejar el clic en "Continuar"
  const handleContinueClick = () => {
    setPrimarySectionAnimation(true); // Animación para ocultar la sección principal
    setTimeout(() => {
      setShowPrimarySection(false); // Ocultar la sección principal
      setShowForm(true); // Mostrar el formulario
      setTimeout(() => setFormAnimation(true), 100); // Animación del formulario
    }, 500);
  };

  return (
    <div className="sm:h-screen h-screen w-full flex flex-col items-center justify-center p-4 overflow-y-hidden no-scrollbar">
      {/* Sección principal */}
      {showPrimarySection && (
        <div
          className={`w-full sm:w-[90%] max-w-[500px] transition-all duration-500 ease-in-out ${
            primarySectionAnimation ? "opacity-0 translate-y-[-50px]" : "opacity-100 translate-y-0"
          }`}
        >
          <section className="flex flex-col">
            <VisibleText text={texts.text1} isVisible={visibleTexts[0]} className={"text-[1.4rem] mb-8"} />
            <VisibleText text={texts.text2} isVisible={visibleTexts[1]} />
            <VisibleText text={texts.text3} isVisible={visibleTexts[2]} className={"mb-5"} />
            <VisibleText text={texts.text4} isVisible={visibleTexts[3]} className={"mb-5"} />
          </section>

          {/* Input para el nombre de la empresa */}
          <InputSection
            companyName={companyName}
            setCompanyName={setCompanyName}
            inputVisible={inputVisible}
            buttonClicked={buttonClicked}
            handleSendClick={handleSendClick}
          />

          {/* Sección adicional (textos y botón de continuar) */}
          {showAdditionalSection && (
            <AdditionalSection
              visibleTexts={visibleTexts}
              texts={texts}
              buttonVisible={buttonVisible}
              continueButtonAnimation={continueButtonAnimation}
              handleContinueClick={handleContinueClick}
              companyName={companyName}
            />
          )}
        </div>
      )}

      {/* Formulario final */}
      {showForm && (
        <div
          className={`w-full max-w-[1200px] transition-all duration-300 ease-in-out ${
            formAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"
          }`}
        >
          <Formulario companyName={companyName} />
        </div>
      )}
    </div>
  );
}

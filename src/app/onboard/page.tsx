"use client";

import { useEffect, useRef, useState } from "react";
import Formulario from "@/components/form";


const texts: { [key: string]: string } = {
    text1: "Hola, somos [name].",
    text2: "Nos especializamos en un sistema de",
    text3: "referidos que ayuda a tu empresa.",
    text4: "Bienvenido, mucho gusto tenerte acá.",
    text5: "Muchas gracias, somos...",
    text6: "Un placer ",
    text7: "Un último paso antes de finalizar.",
};

export default function Onboard() {
    const [visibleTexts, setVisibleTexts] = useState<boolean[]>([false, false, false, false, false]);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [showAdditionalSection, setShowAdditionalSection] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formAnimation, setFormAnimation] = useState<boolean>(false);
    const [showPrimarySection, setShowPrimarySection] = useState<boolean>(true);
    const [primarySectionAnimation, setPrimarySectionAnimation] = useState<boolean>(false);
    const [companyName, setCompanyName] = useState<string>("");
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const [inputDisabled, setInputDisabled] = useState<boolean>(false);
    const [showCircle, setShowCircle] = useState<boolean>(false);
    const [buttonVisible, setButtonVisible] = useState<boolean>(false);
    const [continueButtonAnimation, setContinueButtonAnimation] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const additionalSectionRef = useRef(null);

    useEffect(() => {
        const showText = (index: number) => {
            if (index < 4) {
                setVisibleTexts((prev) => {
                    const newVisibleTexts = [...prev];
                    newVisibleTexts[index] = true;
                    return newVisibleTexts;
                });
                setTimeout(() => showText(index + 1), 400);
            } else {
                setTimeout(() => setInputVisible(true), 400);
            }
        };

        showText(0);
    }, []);

    const handleSendClick = () => {
        if (companyName.trim() === "") {
            setError("El nombre de la empresa es obligatorio");
            return;
        }
        setButtonClicked(true);
        setInputDisabled(true);
        setShowAdditionalSection(true);

        setTimeout(() => {
            setShowCircle(true);

            let delay = 400;
            [4, 5].forEach((textIndex) => {
                setTimeout(() => {
                    setVisibleTexts((prev) => {
                        const newVisibleTexts = [...prev];
                        newVisibleTexts[textIndex] = true;
                        return newVisibleTexts;
                    });
                }, delay);
                delay += 400;
            });

            setTimeout(() => {
                setButtonVisible(true);
                setTimeout(() => setContinueButtonAnimation(true), 100);
            }, delay);
        }, 500);
    };

    const handleContinueClick = () => {
        setPrimarySectionAnimation(true);
        setTimeout(() => {
            setShowPrimarySection(false);
            setShowForm(true);
            setTimeout(() => setFormAnimation(true), 100);
        }, 500);
    };

    return (
        <div className="sm:h-screen h-screen w-full flex flex-col items-center justify-center p-4 overflow-y-hidden no-scrollbar">
            {showPrimarySection && (
                <div
                    className={`w-full sm:w-[90%] max-w-[500px] transition-all duration-500 ease-in-out ${
                        primarySectionAnimation ? "opacity-0 translate-y-[-50px]" : "opacity-100 translate-y-0"
                    }`}
                >
                    <header className="flex flex-col">
                        {visibleTexts[0] && (
                            <span className="flex-nowrap text-[1.45rem] font-semibold mb-7 overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">
                                {texts.text1}
                            </span>
                        )}
                        {visibleTexts[1] && (
                            <span className="text-[1.2rem] leading-6 mb-2 overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">
                                {texts.text2}
                            </span>
                        )}
                        {visibleTexts[2] && (
                            <span className="text-[1.2rem] leading-6 mb-5 overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">
                                {texts.text3}
                            </span>
                        )}
                        {visibleTexts[3] && (
                            <span className="text-[1.2rem] leading-6 mb-5 overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">
                                {texts.text4}
                            </span>
                        )}
                    </header>

                    <section
                        className={`flex justify-between min-h-[75px] h-[75px] border-2 border-border rounded-2xl pl-[10px] mb-[20px] transition-all duration-300 ${
                            inputVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"
                        }`}
                    >
                        <div className="flex items-center space-x-2">
                            {showCircle && (
                                <div className="flex justify-center items-center min-w-[35px] min-h-[35px] bg-white text-black rounded-full text-[1.2rem] font-bold border-2 border-black">
                                    {companyName.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div className="flex flex-col transition-all duration-300 ">
                                <label className="text-slate-600 text-[0.8rem]">{texts.text5}</label>
                                {inputDisabled ? (
                                    <span className="text-[1.1rem]">{companyName}</span>
                                ) : (
                                    <>
                                        <input
                                            className="bg-transparent w-full text-foreground border-0 focus:outline-none"
                                            placeholder="Nombre de tu empresa"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                        />
                                        {error && (
                                            <span className="text-red-500 text-sm mt-1">{error}</span>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleSendClick}
                            className={`text-white font-semibold text-[0.9rem] rounded-lg w-[80px] h-[35px] m-[10px] bg-chart-1 hover:brightness-90 transition-all duration-300 ${
                                buttonClicked ? "opacity-0" : "opacity-100"
                            }`}
                            disabled={buttonClicked || companyName.trim() === ""}
                        >
                            Enviar
                        </button>
                    </section>

                    {showAdditionalSection && (
                        <section
                            ref={additionalSectionRef}
                            className="w-full flex flex-col items-center transition-all duration-500 ease-in-out"
                        >
                            {visibleTexts[4] && (
                                <span className="text-[1.2rem] self-start leading-6 mb-2 overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">
                                    {texts.text6}
                                    {companyName}
                                </span>
                            )}
                            {visibleTexts[5] && (
                                <span className="text-[1.2rem] self-start leading-6 mb-6 overflow-hidden whitespace-nowrap border-r-2 border-black animate-typing">
                                    {texts.text7}
                                </span>
                            )}
                            {buttonVisible && (
                                <button
                                    onClick={handleContinueClick}
                                    className={`bg-chart-1 hover:brightness-90 text-white font-semibold rounded-lg h-[35px] w-[160px] transition-all duration-500 ease-in-out ${
                                        continueButtonAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"
                                    }`}
                                >
                                    Continuar
                                </button>
                            )}
                        </section>
                    )}
                </div>
            )}

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


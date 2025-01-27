import VisibleText from "@/components/VisibleText";

interface AdditionalSectionProps {
  visibleTexts: boolean[];
  texts: { [key: string]: string };
  buttonVisible: boolean;
  continueButtonAnimation: boolean;
  handleContinueClick: () => void;
  companyName: string;
}

export default function AdditionalSection({
  visibleTexts,
  texts,
  buttonVisible,
  continueButtonAnimation,
  handleContinueClick,
  companyName,
}: AdditionalSectionProps) {
  return (
    <section className="w-full flex flex-col items-center transition-all duration-500 ease-in-out">
        <VisibleText
          text={`${texts.text6}${companyName}`}
          isVisible={visibleTexts[4]}
          className="self-start"
        />
        <VisibleText
          text={texts.text7}
          isVisible={visibleTexts[5]}
          className="self-start mb-5"
        />
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
  );
}


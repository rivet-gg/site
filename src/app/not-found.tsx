import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlockQuestion } from "@fortawesome/sharp-solid-svg-icons";
import { GameBackground } from "@/components/Game";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";

function PageNotFound() {
    return (
        <div>
            <Header />
            <div className="relative pt-14">
                <div className="min-h-[80vh] w-full flex justify-center items-center text-center relative">
                    <GameBackground />
                    <div className="transition-opacity">
                        <h1 className="text-white text-3xl flex items-center justify-center mb-3">
                            <FontAwesomeIcon
                                className="size-10 mr-2"
                                icon={faBlockQuestion}
                            />{" "}
                            Not Found
                        </h1>
                        <Button href="/" variant="secondary">Home</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PageNotFound;

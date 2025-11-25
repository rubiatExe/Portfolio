import { useLocation } from "wouter";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Resume() {
    const [, setLocation] = useLocation();

    return (
        <div className="flex flex-col h-[100dvh] w-full bg-black">
            {/* Header */}
            <header className="flex items-center justify-between px-4 md:px-8 py-4 bg-sidebar border-b border-sidebar-border">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setLocation("/")}
                        className="text-foreground hover:text-foreground"
                        data-testid="button-back"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-foreground">Resume</h1>
                        <p className="text-sm text-muted-foreground">Rubiat Bin Faisal</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hidden md:flex"
                        data-testid="button-download"
                    >
                        <a href="/Rubiat-Resume-Final.pdf" download>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </a>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hidden md:flex"
                        data-testid="button-open-new-tab"
                    >
                        <a href="/Rubiat-Resume-Final.pdf" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open in New Tab
                        </a>
                    </Button>
                </div>
            </header>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden bg-card">
                <iframe
                    src="/Rubiat-Resume-Final.pdf"
                    className="w-full h-full border-0"
                    title="Resume PDF"
                />
            </div>

            {/* Mobile Action Buttons */}
            <div className="md:hidden flex gap-2 p-4 bg-sidebar border-t border-sidebar-border">
                <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1"
                >
                    <a href="/Rubiat-Resume-Final.pdf" download>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                    </a>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1"
                >
                    <a href="/Rubiat-Resume-Final.pdf" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open
                    </a>
                </Button>
            </div>
        </div>
    );
}

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TweetGenerator from "./TweetGenerator";

export default function Tools() {
    return (<>

        <Dialog>
            <DialogTrigger>
                <Button variant="destructive" >Tools</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Make It IBRL</DialogTitle>
                    <DialogDescription>
                        <TweetGenerator />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </>);
}

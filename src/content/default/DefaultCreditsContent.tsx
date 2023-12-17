import { Card } from "../../Card"
import { CreditsTrailer } from "./CreditsTrailer"
import { CreditsWebsite } from "./CreditsWebsite"


export const DefaultCreditsContent = (props: React.ComponentProps<typeof Card>) => {
    return (
        <>
            <Card heading={<h1>Credits</h1>}{...props} />
            <CreditsWebsite />
            <CreditsTrailer />
        </>
    )
}

import { Card, CardProps } from "../../components/Card"
import { CreditsTrailer } from "./CreditsTrailer"
import { CreditsWebsite } from "./CreditsWebsite"

export const DefaultCreditsContent = (props: CardProps) => {
    return (
        <>
            <Card subHeading={<h2>Project Organization</h2>} heading={<h1>Credits</h1>}{...props} />
            <CreditsWebsite />
            <CreditsTrailer />
        </>
    )
}

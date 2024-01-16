import { Card, CardProps } from "../../components/Card"
import { CreditsWebsite } from "../default/CreditsWebsite"
import { Ymm4CreditsTrailerCard } from "./cards/Ymm4CreditsTrailersCard"

export const Credits = ({ children, ...props }: CardProps) => (
    <>
        <Card subHeading={<h2>Project Organization</h2>} heading={<h1>Credits</h1>}{...props}>
            <dl>
                <dt>Project manager</dt>
                <dd>Kiavik</dd>

                <dt>Coordinators</dt>
                <dd>Bossman</dd>
                <dd>Buflen</dd>
                <dd>CTRX</dd>
                <dd>DanTheVP</dd>
                <dd>DavidPinkston</dd>
                <dd>DTSpies</dd>
                <dd>Donkeymint</dd>
                <dd>Four Wings</dd>
                <dd>Julian</dd>
            </dl>
        </Card>
        <CreditsWebsite {...props} />
        <Ymm4CreditsTrailerCard {...props} />
    </>
)
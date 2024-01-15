import { Card, CardProps } from "../../components/Card"
import { CreditsWebsite } from "../default/CreditsWebsite"
import { Ymm5CreditsTrailerCard } from "./cards/Ymm5CreditsTrailerCard"

export const Credits = ({ children, ...props }: CardProps) => (
    <>
        <Card subHeading={<h2>Project Organization</h2>} heading={<h1>Credits</h1>}{...props}>
            <dl>
                <dt>Project manager</dt>
                <dd>Kiavik</dd>

                <dt>Coordinators</dt>
                <dd>Bossman</dd>
                <dd>DTSpies</dd>
                <dd>Donkeymint</dd>
                <dd>Four Wings</dd>
                <dd>Lektor</dd>
                <dd>Mini Barf</dd>

                <dt>Cheese master (QA)</dt>
                <dd>Zurfink</dd>

                <dt>Lead playtesters</dt>
                <dd>Mang</dd>
                <dd>Salt Lake</dd>


            </dl>
        </Card>
        <CreditsWebsite {...props} />
        <Ymm5CreditsTrailerCard {...props} />
    </>
)
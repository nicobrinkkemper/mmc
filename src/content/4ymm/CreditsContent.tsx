import { Card, CardProps } from "../../components/Card"
import { CreditsWebsite } from "../default/CreditsWebsite"

export const CreditsContent = ({ children, ...props }: CardProps) => (
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
        <Card {...props}>
            <h2>Trailers</h2>
            <dl>
                <dt>Script, visuals & edit</dt>
                <dd>Lektor</dd>

                <dt>Visual concepts</dt>
                <dd>Paxsman</dd>

                <dt>Voice & script</dt>
                <dd>DuffyWeber</dd>

                <dt>Video capture</dt>
                <dd>DanTheVP</dd>
                <dd>Paxsman</dd>

                <dt>Music</dt>
                <dd>Qumu</dd>
                <dd>T.L.B. Orchestration</dd>
            </dl>
            <p>Special thanks to Kiavik and Lektor Jr. (a.k.a. Liam)</p>
        </Card>
    </>
)
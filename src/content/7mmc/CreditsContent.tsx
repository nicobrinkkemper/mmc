import { Card, CardProps } from "../../components/Card"
import { CreditsWebsite } from "../default/CreditsWebsite"
import { Mm7CreditsTrailerCard } from "./cards/Mm7CreditsTrailerCard"

export const CreditsContent = (props: CardProps) => (
    <>
        <Card subHeading={<h2>Project Organization</h2>} heading={<h1>Credits</h1>}{...props}>
        <dl>
            <dt>Judges</dt>
            <dd>B0X_Gaming</dd>
            <dd>BigRedBoy</dd>
            <dd>choo_choo!</dd>
            <dd>DeathToSpies</dd>
            <dd>Donkey_Mint_Inc</dd>
            <dd>DRhazar</dd>
            <dd>grakowsky</dd>
            <dd>jneen</dd>
            <dd>Loup&amp;Snoop</dd>
            <dd>Major314</dd>
            <dd>MrElectrodude</dd>
            <dd>nickabuz</dd>
            <dd>Paxsman</dd>
            <dd>PocketLint</dd>
            <dd>rubenscube</dd>
            <dd>rybonez</dd>
            <dd>S Ninjar</dd>
            <dd>Skelthane</dd>
            <dd>warspyking</dd>
            <dd>xxBenxxS</dd>
            <dt>Visual profile/marketing</dt>
            <dd>Lektor</dd>
        </dl>
        </Card>
        <CreditsWebsite {...props} />
        <Mm7CreditsTrailerCard {...props} />
    </>
)
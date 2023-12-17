import { Card, CardProps } from "../../Card"

export const CreditsContent = (props: CardProps) => (
    <Card heading={<h1>Credits</h1>} subHeading={<h2>Project Organization</h2>} {...props}>
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
)
import Card from "../../Card"
import { useTheme } from "../../theme/useTheme";
import { CreditsTrailer, CreditsWebsite } from "../default/DefaultCreditsContent";

const CreditsContent = () => {
    const { Credits: { CreditsCard } } = useTheme();
    return (
        <div>

            <h1>Credits</h1>
            <Card className={CreditsCard}>
                <h2>Project Organization</h2>
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
            <CreditsWebsite />
            <CreditsTrailer />
        </div>
    )
}

export { CreditsContent };
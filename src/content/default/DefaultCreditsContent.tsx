import Card from "../../Card"
import { useTheme } from "../../theme/useTheme";

export const CreditsWebsite = () => {
    const { Credits: { CreditsCard } } = useTheme();
    return <Card className={CreditsCard}>
        <h2>Website</h2>
        <dl>
            <dt>Web Developer</dt>
            <dd><a href="https://twitter.com/bbmariomaker2" target="_BLANK" rel="noreferrer" className="highlight">General BB / Geitje</a></dd>

            <dt>UX Design</dt>
            <dd>Birdhare</dd>

            <dt>Graphics</dt>
            <dd>Lektor</dd>

            <dt>Hosting</dt>
            <dd>DuffyWeber</dd>
        </dl>

    </Card>
}

export const CreditsTrailer = () => {
    const { Credits: { CreditsCard } } = useTheme();
    return (
        <Card className={CreditsCard}>
            <h2>Trailers</h2>
            <dl>
                <dt>Script, visuals &amp; edit</dt>
                <dd>Lektor</dd>

                <dt>Additional visuals</dt>
                <dd>choo_choo!</dd>

                <dt>Voice</dt>
                <dd>DuffyWeber</dd>

                <dt>Music</dt>
                <dd>Qumu</dd>
            </dl>
            <p>Special thanks to Kiavik and Lektor Jr. (a.k.a. Liam)</p>
        </Card>
    )
}


export const DefaultCreditsContent = () => {
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

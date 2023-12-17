import { Card } from "../../Card"

export const CreditsTrailer = (props: React.ComponentProps<typeof Card>) => {
    return (
        <Card {...props}>
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
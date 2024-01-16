import { Card } from "../../components/Card"

export const CreditsTrailer = (props: React.ComponentProps<typeof Card>) => {
    return (
        <Card {...props}>
            <h2>Trailers</h2>
            <dl>
                <dt>Script and video</dt>
                <dd>Paxsman</dd>

                <dt>Intro animation</dt>
                <dd>Lektor</dd>

                <dt>Voice</dt>
                <dd>DuffyWeber</dd>

                <dt>Music</dt>
                <dd>Qumu</dd>
            </dl>
            <p>Special thanks to Lektor Jr. (a.k.a. Liam)</p>
        </Card>
    )
}
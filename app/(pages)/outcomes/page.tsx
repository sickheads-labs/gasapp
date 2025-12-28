import { getMySales } from "../../lib/data";
import Outcomes from "../../ui/outcomes/outcomes";

export default async function Page() {
  // TODO: Resolve user data
  const sales = await getMySales('charlie');

  return (<>
    <Outcomes sales={sales} />
  </>);
}

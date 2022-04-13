import { MathDeviation } from "./math.deviation";
import { MathRandom } from "./math.random";

class MathDistributor {
  RANDOM = new MathRandom();
  DEVIATION = new MathDeviation();
}
/**
 * Класс который предоставляет доступ к математическим методам
 */
export const mathTestDataDistributor = new MathDistributor();

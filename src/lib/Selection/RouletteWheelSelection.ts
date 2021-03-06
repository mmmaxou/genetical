import {Chromosome} from '../Genetic/Chromosome';
import {Population} from '../Genetic/Population';
import {BitChain} from '../Helpers/BitChain';
import {SelectionStrategy} from './SelectionGeneric';

/**
 * https://arxiv.org/pdf/1109.3627.pdf
 * Article about roulette wheel theory
 */
export class RouletteWheelSelection<EncodedType = BitChain> extends SelectionStrategy<EncodedType> {
  public selection(pop: Population<EncodedType>): EncodedType[] {
    /**
     * Init
     */
    // const fitnessMin = pop.leastFit.normalizedFitnessScore;
    // console.log('fitness max is ', fitnessMax);
    // console.log('fitness min is ', fitnessMin);
    const selected: EncodedType[] = [];

    /**
     * Loop
     */
    while (selected.length < pop.config.population.popsize) {
      /**
       * 1.
       * Select randomly one of the individuals (say,i).
       * The selection is done with uniform probability (1/N),
       * which does not depend on the individual’s fitness
       */
      const i = Math.round(Math.random() * (pop.population.length - 1));
      const individual: Chromosome<EncodedType> = pop.population[i];

      /**
       * 2.
       * With  probability wi/wmax,
       * where wmax = max { wi } Ni = 1 is the maximal fitness in the population,
       * the selection is accepted.
       * Otherwise, the procedure is repeated from step 1
       * (i.e., in the case of rejection, another selection attempt is made)
       */
      const rng = Math.random();
      const p = individual.normalizedFitnessScore / pop.fittest.normalizedFitnessScore;
      if (p >= rng) {
        selected.push(individual.cloneChain());
      }
    }

    /// Return the selected bitchains
    return selected;
  }
}

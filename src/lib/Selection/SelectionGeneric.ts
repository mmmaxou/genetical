import {CountTime} from './../Helpers/CountTime';
import {Population} from '../Population';
import {BitChain} from '../Helpers/BitChain';

/**
 * Type for selection strategy
 */
export type SelectionFunction = (
  population: Population,
  statistics?: SelectionStatistics
) => BitChain[];

/**
 * Interface for statistics
 */
export class SelectionStatistics {
  public time = 0;
  public iterations = 0;
  public averageIteration = 0;
  public averageTime = 0;
}

/**
 * Inspirations for selections strategies
 * https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)#a._Roulette_Wheel_Selection
 */

/**
 * Interface for a selection strategy
 */
export abstract class SelectionStrategy {
  public abstract selection(
    population: Population,
    statistics?: SelectionStatistics
  ): BitChain[];

  public selectionWithStatistics(
    population: Population,
    statistics: SelectionStatistics
  ): BitChain[] {
    const timer = new CountTime();
    const averageIteration = population.population.length * 3;
    const averageTime = averageIteration * 0.0005;
    const chain = this.selection(population);
    statistics.time += timer.time();
    statistics.averageIteration += averageIteration;
    statistics.averageTime += averageTime;
    return chain;
  }
}

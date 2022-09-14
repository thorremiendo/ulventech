import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  it('should count words', () => {
    const service = new DataService(null);
    let result = service.countWords('hey there delilah');
    expect(result).toBe(3);
  });

  it('should rank words', () => {
    let unrankedWords = [
      {
        word: 'an',
        count: 1,
      },
      {
        word: 'apple',
        count: 4,
      },
      {
        word: 'orange',
        count: 2,
      },
    ];
    let rankedWords = [
      {
        count: 4,
        rank: 1,
        word: 'apple',
      },
      {
        count: 2,
        rank: 2,
        word: 'orange',
      },
      {
        count: 1,
        rank: 3,
        word: 'an',
      },
    ];
    const service = new DataService(null);
    let result = service.rankWords(unrankedWords);
    expect(result).toEqual(rankedWords);
  });
});

;; Part 1

((fn [position, destinations, instructions]
   (if (= (count instructions) 0)
     (count destinations)
     (let [current-instruction (first instructions)
           new-position (case current-instruction
                          \> (update-in position [0] inc)
                          \< (update-in position [0] dec)
                          \^ (update-in position [1] inc)
                          \v (update-in position [1] dec))]
       (recur new-position
              (conj destinations new-position)
              (rest instructions)))))
  [0 0] #{[0 0]} (slurp "answers/inputs/day03.txt"))
